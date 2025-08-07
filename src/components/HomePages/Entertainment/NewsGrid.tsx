import React from "react";
import NewsCard from "./NewsCard";
import MainFeatureCard from "./MainFeatureCard";
import { NewsItem } from "@/types/news.types";
import { stripHtmlAndLimit } from "@/utils/stripAndLimitHtml";
import { getBengaliTimeAgo } from "@/utils/getBengaliTimeAgo";

const NewsGrid = ({ data }: { data: NewsItem[] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
   
      <div className="col-span-1 space-y-6">
        {
          data.slice(0, 3).map((news, i) => <NewsCard category={news.category} id={news.id} image={news.imageUrl} time={getBengaliTimeAgo(news.createdAt)} title={news.title} key={i} />)
        }
      </div>

      {/* Main Column */}
      <div className="">
        <MainFeatureCard
          image={data[3].imageUrl || "https://media.prothomalo.com/prothomalo-bangla%2F2025-06-23%2Fwbd5nux5%2Fresize.jpg?rect=134%2C0%2C666%2C444&w=420&auto=format%2Ccompress&fmt=avif"}
          title={data[3].title}
          description={stripHtmlAndLimit(data[3].content, 5).short}
          time={getBengaliTimeAgo(data[3].createdAt)}
          id={data[3].id}
          category={data[3].category}
        />
      </div>


      <div className=" space-y-6">
        {
          data.slice(4, data.length+1).map((news, i) => <NewsCard id={news.id} image={news.imageUrl} time={getBengaliTimeAgo(news.createdAt)} title={news.title} key={i} category={news.category}/>)
        }
      </div>
    </div>
  );
};

export default NewsGrid;
