export interface IPoem {
  id: string;
  date: string;
  title: string;
  dynasty: string;
  author: string;
  content: string[];
  translate?: string[];
  tags: string[];
}
