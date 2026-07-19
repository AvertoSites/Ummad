import type { ComponentType } from "react";
import { motion } from "framer-motion";
import type { IconProps } from "r3d-icons";
import { formatDate } from "../../../utils/format-date";

interface ArticleCardProps {
  article: {
    title: string;
    excerpt: string;
    category: string;
    publishedAt: string;
    readTime: string;
    icon: ComponentType<IconProps>;
  };
  index: number;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  const Icon = article.icon;

  return (
    <motion.article
      className="article-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <div className="article-card__icon">
        <Icon
          size={54}
          preset="glassmorphism"
          angle="perspective"
          theme="dark"
        />
      </div>
      <div className="article-card__meta">
        <span>{article.category}</span>
        <span>
          {formatDate(article.publishedAt)} · {article.readTime}
        </span>
      </div>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
    </motion.article>
  );
}
