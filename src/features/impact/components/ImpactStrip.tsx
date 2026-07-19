import { motion } from "framer-motion";
import { impactMetrics } from "../content";

export function ImpactStrip() {
  return (
    <section className="impact-strip" id="impact">
      {impactMetrics.map((metric, index) => {
        const MetricIcon = metric.icon;

        return (
          <motion.article
            key={metric.label}
            className="impact-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
          >
            <MetricIcon
              size={40}
              preset="glassmorphism"
              angle="tilted"
              theme="dark"
            />
            <strong>{metric.value}</strong>
            <p>{metric.label}</p>
          </motion.article>
        );
      })}
    </section>
  );
}
