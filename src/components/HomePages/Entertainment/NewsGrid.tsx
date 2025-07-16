import React from "react";
import NewsCard from "./NewsCard";
import MainFeatureCard from "./MainFeatureCard";
import { NewsItem } from "@/types/news.types";
import { stripHtmlAndLimit } from "@/utils/stripAndLimitHtml";
import { getBengaliTimeAgo } from "@/utils/getBengaliTimeAgo";

const NewsGrid = ({ data }: { data: NewsItem[] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column */}
      {/* <div className="col-span-1">
        <NewsCard
          image="https://media.prothomalo.com/prothomalo-bangla%2F2025-06-23%2F4vopdc0o%2F881f9dde-469d-4a02-80e0-54b6d45172a5.jpg?rect=0%2C0%2C3045%2C2030&w=200&auto=format%2Ccompress&fmt=avif"
          title="জগন্নাথ বিশ্ববিদ্যালয়ে চলচ্চিত্র উৎসবের পর্দা উঠল"
          time="৩৬ মিনিট আগে"
        />
        <NewsCard
          image="https://media.prothomalo.com/prothomalo-bangla%2F2025-06-23%2Fmlc0ozqt%2Fe105bb9b-e459-4122-9eba-f34156753fd0.jpg?rect=134%2C0%2C726%2C484&w=200&auto=format%2Ccompress&fmt=avif"
          title="‘শীতের রাতে কথা-কবরা নিয়ে ঢাকায় আসছেন’"
          time="১ ঘন্টা আগে"
        />
        <NewsCard
          image="https://media.prothomalo.com/prothomalo-bangla%2F2025-06-18%2Fsqoq9s4j%2Fsuga-.jpg?rect=0%2C20%2C641%2C427&w=200&auto=format%2Ccompress&fmt=avif"
          title="অভিনয়ে আছে ছোটদের জন্য ৫০০ কোটি টাকা"
          time="২ ঘন্টা আগে"
        />
      </div> */}


      <div className="col-span-1 space-y-6">
        {
          data.slice(0, 3).map((news, i) => <NewsCard category={news.category} id={news.id} image={news.imageUrl} time={getBengaliTimeAgo(news.createdAt)} title={news.title} key={i} />)
        }
      </div>

      {/* Main Column */}
      <div className="">
        {/* <MainFeatureCard
          image="https://media.prothomalo.com/prothomalo-bangla%2F2025-06-23%2Fwbd5nux5%2Fresize.jpg?rect=134%2C0%2C666%2C444&w=420&auto=format%2Ccompress&fmt=avif"
          title="অন্তরঙ্গ দৃশ্যে দেব-শুভশ্রী, সাবেক প্রেমিক যুগের রসায়ন দেখার অপেক্ষায় ভক্তরা"
          description="নব জুটির আসন্ন ছবিতে দেখা যাবে পুরনো প্রেমের ছায়া। ভক্তরা অপেক্ষায় সাবেক প্রেমিক যুগলের রসায়নের।"
          time="৩৬ মিনিট আগে"
        /> */}

        <MainFeatureCard
          image={data[3].imageUrl || "https://media.prothomalo.com/prothomalo-bangla%2F2025-06-23%2Fwbd5nux5%2Fresize.jpg?rect=134%2C0%2C666%2C444&w=420&auto=format%2Ccompress&fmt=avif"}
          title={data[3].title}
          description={stripHtmlAndLimit(data[3].content, 26).short}
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
