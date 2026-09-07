import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { headerVariants } from "../../lib/motion";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Optional slot rendered under the description (e.g. a search field). */
  children?: ReactNode;
}

/** The sky-gradient hero used at the top of every listing page. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-sky-700 to-sky-900 text-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          className="text-sky-200 text-sm font-semibold uppercase tracking-wider mb-3"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          className="text-3xl sm:text-5xl font-extrabold mb-4"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="text-sky-100 max-w-2xl mx-auto text-base sm:text-lg"
          >
            {description}
          </motion.p>
        )}
        {children && (
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}
