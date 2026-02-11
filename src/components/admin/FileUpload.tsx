"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, FileVideo, Image as ImageIcon } from "lucide-react";
import { uploadFile } from "@/actions/upload";
import { toast } from "sonner";

interface FileUploadProps {
    value?: string | string[];
    onChange: (url: string | string[]) => void;
    onRemove?: () => void;
    label?: string;
    accept?: string;
    className?: string;
    multiple?: boolean;
    folder?: string;
}

export default function FileUpload({
    value,
    onChange,
    onRemove,
    label = "Dosya Yükle",
    accept = "image/*,video/*",
    className = "",
    multiple = false,
    folder = ""
}: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleUploadFiles(Array.from(files));
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleUploadFiles(Array.from(files));
        }
    };

    const handleUploadFiles = async (files: File[]) => {
        setIsLoading(true);
        const uploadedUrls: string[] = [];

        try {
            const uploadPromises = (files ?? []).map(async (file) => {
                const formData = new FormData();
                formData.append("file", file);
                if (folder) formData.append("folder", folder);
                const res = await uploadFile(formData);
                if (res.success && res.url) {
                    return res.url;
                }
                return null;
            });

            const results = await Promise.all(uploadPromises);
            results.forEach(url => {
                if (url) uploadedUrls.push(url);
            });

            if (uploadedUrls.length > 0) {
                if (multiple) {
                    onChange(uploadedUrls); // Return array
                } else {
                    onChange(uploadedUrls[0]); // Return first one
                }
                toast.success(`${uploadedUrls.length} dosya yüklendi`);
            } else {
                toast.error("Yükleme başarısız");
            }

        } catch (error) {
            toast.error("Yükleme sırasında hata oluştu");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemove = () => {
        onChange("");
        if (onRemove) onRemove();
    };

    // If there is a SINGLE value and NOT multiple mode
    if (typeof value === "string" && value && !multiple) {
        const isVideo = value.match(/\.(mp4|webm|ogg)$/i);

        return (
            <div className={`relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group ${className}`}>
                {isVideo ? (
                    <div className="flex items-center justify-center aspect-video bg-black/5">
                        <FileVideo size={48} className="text-gray-400" />
                        <span className="absolute bottom-2 text-xs text-gray-500 truncate max-w-[90%] px-2">{value.split("/").pop()}</span>
                    </div>
                ) : (
                    <div className="relative aspect-video">
                        <img src={value} alt="Upload" className="w-full h-full object-cover" />
                    </div>
                )}

                <button
                    type="button"
                    onClick={handleRemove}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Kaldır"
                >
                    <X size={16} />
                </button>
            </div>
        );
    }

    return (
        <div className={className}>
            <div
                className={`
                    border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors
                    ${isDragging ? "border-accent bg-accent/5" : "border-gray-300 hover:bg-gray-50"}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={inputRef}
                    className="hidden"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileSelect}
                />

                {isLoading ? (
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                        <Loader2 size={32} className="animate-spin text-accent" />
                        <span className="text-sm">Yükleniyor...</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                        <div className="p-3 bg-gray-100 rounded-full">
                            <Upload size={24} className="text-gray-600" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-700">
                                {label}
                            </p>
                            <p className="text-xs text-gray-400">{multiple ? "Çoklu dosya seçebilirsiniz" : "Resim veya Video"}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
