import { getReels } from "@/lib/db";
import ReelsClient from "@/components/admin/ReelsClient";

export default async function ReelsPage() {
    const reels = await getReels();

    return <ReelsClient initialData={reels} />;
}
