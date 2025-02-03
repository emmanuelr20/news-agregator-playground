"use client";
import React from "react";
import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { fomrmatDate } from "@/lib/utils";
import MainLayout from "@/components/layout/main-layout";

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

const newsSources = [
  { label: "NewsAPI", value: "NewsAPI" },
  { label: "OpenNews", value: "OpenNews" },
];

export default function page() {
  return (
    <MainLayout>
      <div className="grid md:grid-cols-3 gap-2 my-6">
        <Card className="">
          <CardContent className="p-4">
            <div className="text-xs text-slate-500 mb-1">
              Preferred News Sources
            </div>
            <MultiSelect
              options={newsSources}
              value={[]}
              onValueChange={() => {
                console.log("");
              }}
            />
          </CardContent>
        </Card>
        <Card className="">
          <CardContent className="p-4">
            <div className="text-xs text-slate-500 mb-1">
              Preferred Categories
            </div>
            <MultiSelect
              options={newsSources}
              value={[]}
              onValueChange={() => {
                console.log("");
              }}
            />
          </CardContent>
        </Card>
        <Card className="">
          <CardContent className="p-4">
            <div className="text-xs text-slate-500 mb-1">Preferred Author</div>
            <Input name="author" className="focus-visible:ring-none" />
          </CardContent>
        </Card>
      </div>

      <div className="text-xl text-slate-300">Results ({news.length}):</div>

      <div className="mt-6">
        {news.map((article) => (
          <a href={`news/${article.id}`} key={article.id}>
            <Card className="mb-6 flex">
              <Avatar className="ml-6 my-6">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="">
                <CardHeader>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>
                    {fomrmatDate(article.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent>{article.body.slice(0, 200)}...</CardContent>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </MainLayout>
  );
}
