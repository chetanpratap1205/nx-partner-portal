"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BriefcaseMedical, Wheat, Leaf, Lock, ArrowRight, ShieldCheck, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MultiProductShowcase() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const activeProduct = {
    id: "doctor",
    name: "Doctor Diary",
    description: "Manage clinic appointments and digital prescriptions.",
    icon: BriefcaseMedical,
    color: "bg-blue-600",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    href: "/doctor-leads",
  };

  const lockedProducts = [
    {
      id: "kisan",
      name: "Kisan Diary",
      description: "Agri-tech solutions for modern farming and crop management.",
      icon: Wheat,
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-700",
    },
    {
      id: "eudr",
      name: "EUDR Compliance",
      description: "Deforestation-free supply chain tracking for European markets.",
      icon: Leaf,
      color: "bg-emerald-600",
      lightColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700",
    },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Active Product */}
      <motion.div
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="h-full"
      >
        <Link href={activeProduct.href} className="block h-full">
          <Card className={`h-full border-2 ${activeProduct.borderColor} shadow-md overflow-hidden relative group cursor-pointer transition-all hover:shadow-xl`}>
            {/* Background Glow */}
            <div className={`absolute top-0 right-0 p-24 opacity-10 blur-3xl rounded-full ${activeProduct.color} -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity duration-500`} />
            
            <CardHeader className="relative z-10 pb-4">
              <div className="flex justify-between items-start">
                <div className={`${activeProduct.color} p-3 rounded-xl shadow-sm text-white`}>
                  <activeProduct.icon className="h-6 w-6" />
                </div>
                <div className="bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                </div>
              </div>
              <CardTitle className="text-xl font-bold mt-4 text-slate-900">{activeProduct.name}</CardTitle>
              <CardDescription className="text-slate-500 font-medium">{activeProduct.description}</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pt-0">
              <div className="flex items-center text-sm font-bold text-blue-600 mt-2 group-hover:text-blue-700">
                Manage territory <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* Locked Products */}
      {lockedProducts.map((product) => (
        <div
          key={product.id}
          className="relative h-full"
          onMouseEnter={() => setHoveredProduct(product.id)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          <motion.div
            animate={{
              scale: hoveredProduct === product.id ? 0.98 : 1,
              opacity: hoveredProduct === product.id ? 0.8 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <Card className="h-full border border-slate-200 shadow-sm overflow-hidden relative bg-slate-50/50">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="bg-slate-200 p-3 rounded-xl text-slate-500">
                    <product.icon className="h-6 w-6" />
                  </div>
                  <div className="bg-slate-200/50 text-slate-500 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Locked
                  </div>
                </div>
                <CardTitle className="text-xl font-bold mt-4 text-slate-700">{product.name}</CardTitle>
                <CardDescription className="text-slate-500/80 font-medium">{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-4">
                  <div className="h-full bg-slate-300 w-1/3 rounded-full" />
                </div>
                <p className="text-xs text-slate-400 font-medium mt-2">Unlock progress: 30%</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Overlay Animation (Wow Factor) */}
          <AnimatePresence>
            {hoveredProduct === product.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 z-20 flex items-center justify-center p-6"
              >
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] rounded-xl" />
                <Card className={`relative z-30 w-full shadow-2xl border-2 ${product.borderColor} ${product.lightColor}`}>
                  <CardContent className="p-5 text-center flex flex-col items-center">
                    <div className={`${product.color} p-2 rounded-full text-white mb-3 shadow-lg shadow-${product.color}/20`}>
                      <Lock className="w-5 h-5" />
                    </div>
                    <h3 className={`font-bold ${product.textColor} text-lg mb-1`}>
                      Coming Soon!
                    </h3>
                    <p className={`text-sm ${product.textColor} opacity-80 font-medium leading-tight mb-4`}>
                      Unlock this product by working hard and hitting your targets in Doctor Diary. We will build this later!
                    </p>
                    <Button size="sm" variant="outline" className={`${product.textColor} ${product.borderColor} hover:${product.lightColor} w-full`}>
                      Got it
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
