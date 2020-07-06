import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValueLabelsService {

  constructor() { }

  getStructureTypes = () => [
    { name: 'tipo-barragem', value: 'Barragem' },
    { name: 'tipo-mina', value: 'Mina' },
    { name: 'tipo-adm', value: 'Estrutura Administrativa' },
    { name: 'tipo-apoio', value: 'Estrutura de Apoio' },
  ];

  getLevels = () => [
    { name: 'alto', value: 3, label: 'Alto' },
    { name: 'medio', value: 2, label: 'Médio' },
    { name: 'baixo', value: 1, label: 'Baixo' },
  ];

  getOperationalSituation = () => [
    { name: 'n-0', value: 0, label: 'Em Construção' },
    { name: 'n-1', value: 1, label: 'Em Operação' },
    { name: 'n-2', value: 2, label: 'Desativado(a)' },
  ];

  getEmergencyLevels = () => [
    { name: 'n-3', value: 3, label: 'Nível 3' },
    { name: 'n-2', value: 2, label: 'Nível 2' },
    { name: 'n-1', value: 1, label: 'Nível 1' },
    { name: 'n-0', value: 0, label: 'Sem Emergência' },
  ];
}
