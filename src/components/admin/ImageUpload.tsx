"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "@/actions/upload";
import { Loader2, UploadCloud, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    disabled?: boolean;
}

export default function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            toast.error("Dosya boyutu 5MB'dan küçük olmalıdır.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const result = await uploadFile(formData);
            if (result.success && result.url) {
                onChange(result.url);
                toast.success("Görsel yüklendi.");
            } else {
                toast.error("Yükleme başarısız oldu.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp']
        },
        maxFiles: 1,
        disabled: disabled || loading
    });

    const removeImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange("");
    };

    return (
        <div className="w-full">
            {value ? (
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-200 group bg-gray-50">
                    <img src={value} alt="Uploaded" className="w-full h-full object-contain" />
                    <button
                        onClick={removeImage}
                        type="button"
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className={`
                    border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                    flex flex-col items-center justify-center gap-4 min-h-[200px]
                    ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary hover:bg-gray-50"}
                    ${loading ? "opacity-50 pointer-events-none" : ""}
                `}
                >
                    <input {...getInputProps()} />
                    {loading ? (
                        <Loader2 size={32} className="animate-spin text-primary" />
                    ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                            <UploadCloud size={24} />
                        </div>
                    )}

                    <div className="space-y-1">
                        <p className="font-medium text-gray-700">
                            {loading ? "Yükleniyor..." : "Görseli buraya sürükleyin veya seçin"}
                        </p>
                        <p className="text-xs text-gray-500">
                            PNG, JPG, WEBP (Max 5MB)
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
