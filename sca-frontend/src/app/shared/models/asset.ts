import { Category } from './category';

export class Asset {
  id: number;
  descricao: string;
  quantidade: number;
  status: string;
  categoria: Category;
}
