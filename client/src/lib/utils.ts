import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fomrmatDate(dateStr: string): string {
  return dayjs(dateStr).format("DD/MM/YYYY HH:mm");
}

export function getNews() {
  return Array(20)
    .fill("")
    .map(() => ({
      id: `id-${Math.ceil(Math.random() * 100000)}`,
      title: `${Math.ceil(
        Math.random() * 100000
      )} - Vestibulum fringilla pede sit amet`,
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
}
