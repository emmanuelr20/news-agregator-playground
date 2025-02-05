"use client";
import React, { Fragment, useEffect, useState } from "react";
import { fomrmatDate } from "@/lib/utils";
import useAuthFetch from "@/hooks/use-auth-fetch";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

export default function NewsDetails({ id }: { id: string }) {
  const { fetchData, token } = useAuthFetch();
  const [article, setArticle] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  const fetchArticle = async () => {
    const data = await fetchData(`articles/${id}`);
    if (data.success) {
      setArticle(data.data.article);
    } else {
      setNotFound(true);
      toast({
        title: "Article not found",
        description: data.message,
      });
    }
  };

  useEffect(() => {
    if (token) {
      fetchArticle();
    }
  }, [token]);

  return article ? (
    <Fragment>
      <h1 className="text-3xl font-semibold mt-10">{article.title}</h1>
      <div className="text-slate-500 text-sm">
        {fomrmatDate(article.pubished_at)}
      </div>

      {!!article.url_to_image && (
        <Image
          src={article.url_to_image}
          width="1000"
          height="500"
          className="w-full h-80 my-8 object-cover"
          alt="article-image"
        />
      )}

      <div className="text-slate-800 mb-3">
        {(article.content as string).split("\n").map((paragraph, index) => (
          <div className="mb-4" key={index}>
            {paragraph}
          </div>
        ))}
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <h1 className="text-3xl font-semibold mt-10">
        {notFound ? "Article not found" : "loading..."}
      </h1>
    </Fragment>
  );
}
