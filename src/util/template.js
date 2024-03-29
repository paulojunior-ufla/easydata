export function getCategoriaByNome (categorias, nome) {
  return categorias.find((categoria) => categoria.nome === nome)
}

export function getCategoriaByNomeImpressao (categorias, nomeImpressao) {
  return categorias.find((categoria) => categoria.nome_impressao === nomeImpressao)
}
