import { Asset } from './asset';

export class Category {
  id: number;
  nome: string;
  status: string;
  ativos: Asset[];
}
