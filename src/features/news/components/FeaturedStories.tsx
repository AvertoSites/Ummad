import { featuredArticles } from "../content";
import { ArticleCard } from "./ArticleCard";

export function FeaturedStories() {
  return (
    <section className="featured-stories" id="latest-news">
      <div className="section-shell">
        <h2>Latest stories</h2>
        <p>
          News, community updates, and public-facing reports organized for quick
          publishing.
        </p>
      </div>

      <div className="article-grid">
        {featuredArticles.map((article, index) => (
          <ArticleCard key={article.title} article={article} index={index} />
        ))}
      </div>
    </section>
  );
}
