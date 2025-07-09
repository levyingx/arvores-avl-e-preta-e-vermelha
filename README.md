Compilar:

> node src/main.mjs

Instruções da atividade:

- (1) Escreva um programa em C/C++ (ou qualquer outra linguagem de sua preferência) que leia o arquivo JSON em anexo e insira cada entrada em um vetor de struct, sendo esse struct similar às entidades (usuários) contidas no JSON, disponível a partir de 10/06/2025.

- (2) Aplique alguma função de shuffle (pesquise sobre isso se necessário, ou procure o professor) para embaralhar o vetor.

- (3) Em seguida, escreva em seu programa uma estrutura para os nodos de uma árvore AVL e uma estrutura para os nodos de uma árvore preta-vermelha, de tal forma que os nodos dessas árvores guardem as informações dos usuários no JSON. Então, para cada árvore, cria as funções de insert, remove e printTree. Sendo que essa última função deve conseguir imprimir uma string que representa a árvore visualmente. Lembre-se de que, durante a inserção e remoção, as funções de rotação vistas em sala devem ser utilizadas para manter as árvores balanceadas.

- (4) No main do seu programa, use a função insert (de cada tipo de árvore) para colocar TODOS os usuários que estão no vetor nas árvores (AVL e preta-vermelha). Após isso, use a função printTree (de cada tipo de árvore) para exibir como ficou cada árvore.

- (5) Ainda no main use a função remove (de cada tipo de árvore) em ambas as árvores para remover SOMENTE os nodos que representam usuários cujo userid seja um número primo!