import MainLayout from "@/components/layout/main-layout";
import { fomrmatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const article = {
  id: `id-1 ${Math.ceil(Math.random() * 100000)}`,
  title: "Vestibulum fringilla pede sit amet",
  body: `Aliquam lobortis. Cras varius. Praesent ac massa at ligula laoreet iaculis. Phasellus consectetuer vestibulum elit. Phasellus nec sem in justo pellentesque facilisis.\nDonec id justo. Pellentesque ut neque. Morbi ac felis. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Vestibulum ullamcorper mauris at ligula.\nDuis vel nibh at velit scelerisque suscipit. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. Phasellus a est. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. In hac habitasse platea dictumst.\nVestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Quisque malesuada placerat nisl. Integer tincidunt. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur nisi.\nSuspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Ut non enim eleifend felis pretium feugiat. Ut a nisl id ante tempus hendrerit. Nulla sit amet est. Etiam sit amet orci eget eros faucibus tincidunt.`,
  createdAt: "2024-12-31 23:59:59",
  source: "",
  author: "",
  category: "",
  imageUrl: "https://picsum.photos/1000",
};

export default function page() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-semibold mt-10">{article.title}</h1>
      <div className="text-slate-500 text-sm">
        {fomrmatDate(article.createdAt)}
      </div>

      {!!article.imageUrl && (
        <Image
          src={article.imageUrl}
          width="1000"
          height="500"
          className="w-full h-80 my-8 object-cover"
          alt="article-image"
        />
      )}

      <div className="text-slate-800 mb-3">
        {article.body.split("\n").map((paragraph, index) => (
          <div className="mb-4" key={index}>
            {paragraph}
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
