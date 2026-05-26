import { motion } from "framer-motion";
import dashboardUser from "../assets/dashboarduser.png";
import dashboardSuperadmin from "../assets/dashboard-superadmin.png";
import CardSwap, { Card } from "./CardSwap";

const MacFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col items-center w-full">
    <div className="relative w-full max-w-[800px] shadow-2xl">
      {/* Screen */}
      <div className="relative rounded-t-xl sm:rounded-t-2xl border-[4px] sm:border-[10px] border-stone-800 dark:border-stone-900 bg-stone-900 aspect-video overflow-hidden">
        {/* Camera dot */}
        <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-stone-950 flex items-center justify-center">
          <div className="w-[1px] h-[1px] sm:w-[2px] sm:h-[2px] bg-blue-500/50 rounded-full" />
        </div>
        {children}
      </div>
      {/* Base */}
      <div className="relative h-2.5 sm:h-4 bg-stone-300 dark:bg-stone-700 rounded-b-md sm:rounded-b-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex justify-center border-t border-stone-400 dark:border-stone-600">
        <div className="w-1/5 h-1.5 sm:h-2.5 bg-stone-400 dark:bg-stone-800 rounded-b-sm sm:rounded-b-md" />
      </div>
    </div>
  </div>
);

export const DashboardShowcase = () => {
  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-zen-bg dark:bg-zen-bg-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="relative max-w-6xl mx-auto flex flex-col items-center">
          
          <div className="text-center mb-8 sm:mb-16 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-stone-600 dark:text-stone-300 uppercase tracking-widest">Multi-Platform</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-stone-900 dark:text-white tracking-tight mb-4"
            >
              Kontrol Penuh dalam <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Satu Genggaman</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto text-sm sm:text-base"
            >
              Visualisasi data yang presisi, sistem manajemen pelaporan yang canggih, dan antarmuka yang dirancang khusus untuk setiap peran dalam ekosistem Smart City.
            </motion.p>
          </div>

          <div className="relative h-[400px] sm:h-[550px] lg:h-[650px] w-full flex justify-center items-center perspective-[1200px] mt-4 sm:mt-8">
            <CardSwap
              width={800}
              height={500}
              cardDistance={60}
              verticalDistance={40}
              delay={5000}
              pauseOnHover={true}
            >
              <Card className="!bg-transparent !border-none !shadow-none flex items-center justify-center">
                <MacFrame>
                  <img 
                    src={typeof dashboardUser === "string" ? dashboardUser : dashboardUser.src} 
                    alt="User Dashboard" 
                    className="w-full h-full object-cover object-left-top"
                  />
                </MacFrame>
              </Card>
              <Card className="!bg-transparent !border-none !shadow-none flex items-center justify-center">
                <MacFrame>
                  <img 
                    src={typeof dashboardSuperadmin === "string" ? dashboardSuperadmin : dashboardSuperadmin.src} 
                    alt="Superadmin Dashboard" 
                    className="w-full h-full object-cover object-left-top"
                  />
                </MacFrame>
              </Card>
              <Card className="!bg-transparent !border-none !shadow-none flex items-center justify-center">
                <MacFrame>
                  <div className="w-full h-full bg-white dark:bg-stone-950 flex items-center justify-center p-8">
                    <img 
                      src="/dashboard.svg" 
                      alt="Illustration Dashboard" 
                      className="w-full h-full object-contain opacity-90"
                    />
                  </div>
                </MacFrame>
              </Card>
            </CardSwap>

            {/* Decorative Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[5%] top-[10%] z-0 hidden lg:block"
            >
              <div className="w-24 h-24 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-2xl" />
              <div className="absolute inset-0 border border-blue-200 dark:border-blue-500/30 rounded-full transform -rotate-12 scale-110" />
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute right-[5%] bottom-[20%] z-0 hidden lg:block"
            >
              <div className="w-32 h-32 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-2xl" />
              <div className="absolute inset-0 border border-indigo-200 dark:border-indigo-500/30 rounded-full transform rotate-45 scale-110" />
            </motion.div>

            {/* Ambient Back Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] max-w-4xl h-[100%] bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
