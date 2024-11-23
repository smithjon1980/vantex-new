"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Calendar, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const AirportTransfer = dynamic(() => import('./tabs/airport-transfer'), {
  loading: () => <LoadingSpinner message="Loading airport transfer form..." />,
  ssr: false
});

const EventTransfer = dynamic(() => import('./tabs/event-transfer'), {
  loading: () => <LoadingSpinner message="Loading event transfer form..." />,
  ssr: false
});

const MedicalTransfer = dynamic(() => import('./tabs/medical-transfer'), {
  loading: () => <LoadingSpinner message="Loading medical transfer form..." />,
  ssr: false
});

export function SearchForm() {
  return (
    <Card className="p-6 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl">
      <Tabs defaultValue="airport" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 gap-1">
          <TabsTrigger value="airport" className="flex flex-col gap-2 py-3">
            <Car className="h-5 w-5" />
            <span>Airport Transfer</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex flex-col gap-2 py-3">
            <Calendar className="h-5 w-5" />
            <span>Events</span>
          </TabsTrigger>
          <TabsTrigger value="medical" className="flex flex-col gap-2 py-3">
            <Stethoscope className="h-5 w-5" />
            <span>Medical</span>
          </TabsTrigger>
        </TabsList>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Suspense fallback={<LoadingSpinner message="Loading form..." />}>
            <TabsContent value="airport" className="mt-0">
              <AirportTransfer />
            </TabsContent>
            <TabsContent value="events" className="mt-0">
              <EventTransfer />
            </TabsContent>
            <TabsContent value="medical" className="mt-0">
              <MedicalTransfer />
            </TabsContent>
          </Suspense>
        </motion.div>
      </Tabs>
    </Card>
  );
}