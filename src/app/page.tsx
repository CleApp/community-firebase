import { Header } from "@/components/header";
import { LostAndFound } from "@/components/lost-and-found";
import { CommunityReports } from "@/components/community-reports";
import { ResourceDirectory } from "@/components/resource-directory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HandHeart, Search, ShieldAlert } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Tabs defaultValue="lost-and-found" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 max-w-2xl mx-auto h-auto sm:h-12">
            <TabsTrigger value="lost-and-found" className="py-2.5 sm:py-0">
              <Search className="mr-2" />
              Lost & Found
            </TabsTrigger>
            <TabsTrigger value="reports" className="py-2.5 sm:py-0">
              <ShieldAlert className="mr-2" />
              Community Reports
            </TabsTrigger>
            <TabsTrigger value="resources" className="py-2.5 sm:py-0">
              <HandHeart className="mr-2" />
              Resources
            </TabsTrigger>
          </TabsList>
          <TabsContent value="lost-and-found" className="mt-6">
            <LostAndFound />
          </TabsContent>
          <TabsContent value="reports" className="mt-6">
            <CommunityReports />
          </TabsContent>
          <TabsContent value="resources" className="mt-6">
            <ResourceDirectory />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
