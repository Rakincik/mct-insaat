import Link from "next/link";
import { getLeads } from "@/lib/db";
import { Mail, Phone, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import LeadStatusSelect from "@/components/admin/LeadStatusSelect";
import DeleteLeadButton from "@/components/admin/DeleteLeadButton";
import LeadDetails from "@/components/admin/LeadDetails";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
    const leads = await getLeads();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Gelen Teklifler</h1>
                <p className="text-gray-500 mt-1">Web sitesinden gelen form başvuruları.</p>
            </div>

            <div className="grid gap-4">
                {leads.map((lead: any) => (
                    <div key={lead.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h3 className="font-bold text-lg text-gray-900">{lead.name}</h3>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                                        <Calendar size={12} />
                                        {new Date(lead.createdAt).toLocaleDateString('tr-TR')}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1 mt-2">
                                    <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-gray-600 hover:text-accent text-sm">
                                        <Phone size={14} />
                                        {lead.phone}
                                    </a>
                                    {lead.email && (
                                        <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-gray-600 hover:text-accent text-sm">
                                            <Mail size={14} />
                                            {lead.email}
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <LeadDetails lead={lead} />
                                <LeadStatusSelect id={lead.id} currentStatus={lead.status} />
                                <DeleteLeadButton id={lead.id} />
                            </div>
                        </div>

                        {lead.projectType && (
                            <div className="mb-2">
                                <span className="text-xs font-bold text-accent uppercase tracking-wider">Proje Tipi:</span>
                                <span className="ml-2 text-sm text-gray-700">{lead.projectType}</span>
                            </div>
                        )}

                        <div className="bg-gray-50 p-4 rounded-md text-gray-700 text-sm italic border-l-4 border-accent/20">
                            "{lead.message}"
                        </div>
                    </div>
                ))}

                {leads.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg text-gray-400">
                        Henüz hiç teklif gelmemiş.
                    </div>
                )}
            </div>
        </div>
    );
}
