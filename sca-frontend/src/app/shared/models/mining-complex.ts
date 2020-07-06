import { Structure } from './structure';
import { Asset } from './asset';

export class MiningComplex {
  id: number;
  nome: string;
  poligono: any;
  uf: string;
  municipio: string;
  situacao_operacional: string;
  lat_long: number[];
  estruturas: Structure[];
  ativos: Asset[];
}
