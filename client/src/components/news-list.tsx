import React, { Fragment, useEffect, useState } from "react";
import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fomrmatDate } from "@/lib/utils";
import useAuthFetch from "@/hooks/use-auth-fetch";
import { MultiSelect } from "./ui/multi-select";
import InfiniteScroll from "react-infinite-scroll-component";

const news = Array(20)
  .fill("")
  .map(() => ({
    id: `id-1 ${Math.ceil(Math.random() * 100000)}`,
    title: "Vestibulum fringilla pede sit amet",
    body: `Aliquam lobortis. Cras varius. Praesent ac massa at ligula laoreet iaculis. Phasellus consectetuer vestibulum elit. Phasellus nec sem in justo pellentesque facilisis.
Donec id justo. Pellentesque ut neque. Morbi ac felis. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Vestibulum ullamcorper mauris at ligula.
Duis vel nibh at velit scelerisque suscipit. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. Phasellus a est. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. In hac habitasse platea dictumst.
Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Quisque malesuada placerat nisl. Integer tincidunt. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur nisi.
Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Ut non enim eleifend felis pretium feugiat. Ut a nisl id ante tempus hendrerit. Nulla sit amet est. Etiam sit amet orci eget eros faucibus tincidunt.`,
    createdAt: "2024-12-31 23:59:59",
    source: "",
    author: "",
    category: "",
  }));

export default function NewsList() {
  const { fetchData, token } = useAuthFetch();
  const [authors, setAuthors] = useState([]);
  const [sources, setSources] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState(1);

  const fetchNews = async () => {
    const params = new URLSearchParams({ page: page.toString() });

    selectedAuthors.forEach((author, i) =>
      params.append(`authors[${i}]`, author)
    );
    selectedSources.forEach((source, i) =>
      params.append(`sources[${i}]`, source)
    );

    const data = await fetchData("articles?" + params.toString());
    if (data.success) {
      const newArticles = data.data.data;
      setArticles((articles) =>
        page === 1 ? newArticles : [...articles, ...newArticles]
      );
      setLastPage(data.data.last_page);
      setPage((page) => page + 1);
    }
  };

  const fetchAuthors = async () => {
    const data = await fetchData("authors");
    if (data.success) {
      setAuthors(
        data.data.authors.map((author: string) => ({
          label: author,
          value: author,
        }))
      );
    }
  };

  const fetchSources = async () => {
    const data = await fetchData("sources");
    if (data.success) {
      setSources(
        data.data.sources.map((source: string) => ({
          label: source,
          value: source,
        }))
      );
    }
  };

  useEffect(() => {
    if (token) {
      fetchAuthors();
      fetchSources();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      setPage(1);
      fetchNews();
    }
  }, [token, selectedAuthors, selectedSources]);

  return (
    <Fragment>
      <div className="grid md:grid-cols-3 gap-2 my-6">
        <Card className="">
          <CardContent className="p-4">
            <div className="text-xs text-slate-500 mb-1">
              Preferred News Sources
            </div>
            <MultiSelect
              options={sources}
              value={selectedSources}
              onValueChange={(value) => setSelectedSources(value)}
            />
          </CardContent>
        </Card>
        {/* <Card className="">
          <CardContent className="p-4">
            <div className="text-xs text-slate-500 mb-1">
              Preferred Categories
            </div>
            <MultiSelect
              options={[]}
              value={[]}
              onValueChange={() => {
                console.log("");
              }}
            />
          </CardContent>
        </Card> */}
        <Card className="">
          <CardContent className="p-4">
            <div className="text-xs text-slate-500 mb-1">Preferred Author</div>
            <MultiSelect
              options={authors}
              value={selectedAuthors}
              onValueChange={(value) => setSelectedAuthors(value)}
            />
          </CardContent>
        </Card>
      </div>

      <div className="text-xl text-slate-300 mb-8">
        Results ({news.length}):
      </div>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchNews}
        hasMore={page < lastPage}
        loader={<h4 className="text-xl font-semibold mt-6">Loading...</h4>}
      >
        {articles.map((article: any) => (
          <a href={`news/${article.id}`} key={article.id}>
            <Card className="mb-6 flex">
              <Avatar className="ml-6 my-6">
                <AvatarImage
                  className="object-cover"
                  src={article.url_to_image}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="">
                <CardHeader>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>
                    {fomrmatDate(article.pubished_at)}
                  </CardDescription>
                </CardHeader>
                <CardContent>{article.description}</CardContent>
              </div>
            </Card>
          </a>
        ))}
      </InfiniteScroll>
    </Fragment>
  );
}
