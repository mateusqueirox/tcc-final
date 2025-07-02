class Livro {
  constructor(titulo, autor, genero, imagem, preco, estado, descricao) {
    this.titulo = titulo;
    this.autor = autor;
    this.genero = genero;
    this.imagem = imagem;
    this.preco = preco;
    this.estado = estado; // "novo" ou "usado"
    this.descricao = descricao;
  }
}

const livros = [
  
  new Livro("Dom Casmurro", "Machado de Assis", "romance", "livros-imagem/dom casmurro.webp", 22.90, "usado", "Bentinho narra sua vida marcada por dúvidas e ciúmes, especialmente sobre Capitu."),
  new Livro("O Hobbit", "J.R.R. Tolkien", "fantasia", "livros-imagem/o hobbit.jpg", 47.50, "novo", "Bilbo Bolseiro embarca em uma aventura com anões para recuperar um tesouro."),
  new Livro("1984", "George Orwell", "ficcao", "livros-imagem/1984.jpg", 19.90, "usado", "Em um regime totalitário, Winston Smith luta contra a vigilância e o controle do Estado."),
  new Livro("Sapiens", "Yuval Noah Harari", "nao-ficcao", "livros-imagem/sapiens.jpg", 48.90, "novo", "Uma análise da história da humanidade, da pré-história à era moderna."),
  new Livro("A Menina que Roubava Livros", "Markus Zusak", "ficcao", "livros-imagem/a menina que roubava livros.jpg", 24.50, "usado", "Durante a Segunda Guerra, Liesel encontra consolo nos livros em meio ao caos."),
  new Livro("Harry Potter e a Pedra Filosofal", "J.K. Rowling", "fantasia", "livros-imagem/pedra filosofal.jpg", 21.90, "usado", "Harry descobre ser um bruxo e inicia sua jornada em Hogwarts."),
  new Livro("O Senhor dos Anéis", "J.R.R. Tolkien", "fantasia", "livros-imagem/senhor dos aneis.jpg", 49.90, "novo", "Frodo precisa destruir o Um Anel para salvar a Terra-média."),
  new Livro("A Revolução dos Bichos", "George Orwell", "ficcao", "livros-imagem/a revolução dos bichos.jpg", 17.90, "usado", "Animais de uma fazenda se rebelam contra humanos em uma sátira política."),
  new Livro("O Alquimista", "Paulo Coelho", "romance", "livros-imagem/o alquimista.jpg", 39.90, "novo", "Santiago parte em busca de um tesouro e descobre o valor dos sonhos."),
  new Livro("Orgulho e Preconceito", "Jane Austen", "romance", "livros-imagem/orgulho e preconceito.jpg", 23.90, "usado", "Elizabeth Bennet enfrenta questões de classe, orgulho e amor na Inglaterra."),
  new Livro("O Código Da Vinci", "Dan Brown", "suspense", "livros-imagem/o codigo da vince.jpg", 44.50, "novo", "Robert Langdon desvenda mistérios religiosos em uma trama cheia de enigmas."),
  new Livro("O Nome do Vento", "Patrick Rothfuss", "fantasia", "livros-imagem/o nome do vento.jpg", 24.90, "usado", "Kvothe narra sua trajetória de menino pobre a lenda viva."),
  new Livro("A Culpa é das Estrelas", "John Green", "romance", "livros-imagem/a culpa é das estrelas.jpg", 36.90, "novo", "Hazel e Gus vivem um romance emocionante enquanto enfrentam o câncer."),
  new Livro("O Morro dos Ventos Uivantes", "Emily Brontë", "romance", "livros-imagem/o morro dos ventos uivantes.jpg", 18.90, "usado", "A paixão destrutiva entre Heathcliff e Catherine marca gerações."),
  new Livro("O Diário de Anne Frank", "Anne Frank", "biografia", "livros-imagem/o diario de anne frank.jpg", 41.90, "novo", "O relato emocionante de uma jovem judia escondida durante o nazismo."),
  new Livro("Moby Dick", "Herman Melville", "aventura", "livros-imagem/moby dick.jpg", 20.90, "usado", "O capitão Ahab persegue obsessivamente a baleia branca Moby Dick."),
  new Livro("O Lobo da Estepe", "Hermann Hesse", "ficcao", "livros-imagem/o lobo da estepe.jpg", 38.90, "novo", "Harry Haller vive um conflito existencial entre o humano e o instinto selvagem."),
  new Livro("Grande Sertão: Veredas", "João Guimarães Rosa", "romance", "livros-imagem/grande sertão.jpg", 25.00, "usado", "Riobaldo narra suas aventuras e dilemas no sertão brasileiro."),
  new Livro("O Apanhador no Campo de Centeio", "J.D. Salinger", "ficcao", "livros-imagem/o apanhador no campo de centeio.jpg", 46.90, "novo", "Holden Caulfield relata sua fuga e críticas à sociedade adulta."),
  new Livro("Ensaio Sobre a Cegueira", "José Saramago", "ficcao", "livros-imagem/ensaio sobre a cegueira.jpg", 23.50, "usado", "Uma epidemia de cegueira revela o lado sombrio da humanidade."),
  new Livro("O Médico e o Monstro", "Robert Louis Stevenson", "terror", "livros-imagem/o medico e o monstro.jpg", 29.90, "novo", "Dr. Jekyll cria uma poção que o transforma em seu alter ego maligno."),
  new Livro("Drácula", "Bram Stoker", "terror", "livros-imagem/dracula de bram strocker.jpg", 25.00, "usado", "O conde Drácula espalha terror ao tentar conquistar Londres."),
  new Livro("O Retrato de Dorian Gray", "Oscar Wilde", "ficcao", "livros-imagem/o retrato de dorian gray.jpg", 33.90, "novo", "Dorian Gray permanece jovem enquanto seu retrato envelhece e revela sua corrupção."),
  new Livro("O Pequeno Príncipe", "Antoine de Saint-Exupéry", "infantil", "livros-imagem/o pequeno principe.jpg", 19.90, "usado", "Um príncipe viaja por planetas e aprende lições sobre amor e amizade."),
];

export { livros };


