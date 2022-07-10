export const ActionMode = Object.freeze({
    DELETAR: "DELETAR",
    ATUALIZAR: "ATUALIZAR",
    NORMAL: "NORMAL",
});

/* Mapeamento dos estados => começará como normal | componente exportado para Home, Navbar, PaletaListaItem
Essa const modificará de acordo com uma ação. Nela, é passada a função object.freeze (Que congela o objeto, "Não permite modificações"
*/