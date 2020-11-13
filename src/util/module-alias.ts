import * as path from 'path';
import moduleAlias from 'module-alias';

const files = path.resolve(__dirname, '../..'); //pega o diretório atual volta 2x e importa todos os arquivos

moduleAlias.addAliases({
  '@src': path.join(files, 'src'),
  '@__test__': path.join(files, '__test__'),
});