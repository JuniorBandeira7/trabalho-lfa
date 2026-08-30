"use client";
import { Modal } from "./components/Modal";
import { useState } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState<"title" | "content">("title");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleNextStep() {
      if (!title.trim()) {
        return
      } setStep("content");
    }

    function handleBackStep() {
      setStep("title");
    }

  function handleOpenCreatePost() {
    setStep("title");
    setTitle("");
    setContent("");
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setStep("title");
  }

  function handleCreatePost() {
    if (!title.trim() || !content.trim()) {
      return;
    }

    const newPost: Post = { id: Date.now(), title, content, createdAt: new Date().toLocaleString("pt-BR"), };

    setPosts((currentPosts) => [newPost, ...currentPosts]);

    setTitle("");
    setContent("");
    setIsModalOpen(false);

  }

  return (
    <main className="min-h-screen bg-zinc-50 p-6 font-sans">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">Meu Blog</h1>

          {posts.length > 0 && (
            <button
              onClick={handleOpenCreatePost}
              className="rounded-lg bg-black px-4 py-2 text-white"
            >
              Criar post
            </button>
          )}
        </header>

        {posts.length === 0 ? (
          <section className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white p-8 text-center">
            <h2 className="text-xl font-semibold">
              O feed está vazio
            </h2>

            <p className="mt-2 text-zinc-500">
              Ainda não existe nenhuma publicação. Crie seu primeiro post!
            </p>

            <button
              onClick={handleOpenCreatePost}
              className="mt-6 rounded-lg bg-black px-4 py-2 text-white"
            >
              Criar primeiro post
            </button>
          </section>
        ) : (
          <section className="flex flex-col gap-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-xl border border-zinc-200 bg-white p-6"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h2 className="text-xl text-gray-500 font-bold">
                    {post.title}
                  </h2>

                  <span className="text-xs text-zinc-400">
                    {post.createdAt}
                  </span>
                </div>

                <p className="whitespace-pre-wrap text-zinc-600">
                  {post.content}
                </p>
              </article>
            ))}
          </section>
        )}
      </div>

      {/* Modal da primeira etapa: título */}
      <Modal
        isOpen={isModalOpen && step === "title"}
        onClose={handleCloseModal}
        title="Criar novo post"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-gray-700">Qual será o título do post?</label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleNextStep();
                }
              }}
              placeholder="Digite o título..."
              className="rounded-lg border border-zinc-300 px-3 py-2 outline-none text-black"
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={handleCloseModal}
              className="rounded-lg border border-zinc-300 px-4 py-2"
            >
              Cancelar
            </button>

            <button
              onClick={handleNextStep}
              disabled={!title.trim()}
              className="rounded-lg bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Próximo
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal da segunda etapa: conteúdo */}
      <Modal
        isOpen={isModalOpen && step === "content"}
        onClose={handleCloseModal}
        title={title}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="text-gray-700">
              Agora escreva o conteúdo do seu post
            </label>

            <textarea
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Escreva seu post..."
              rows={8}
              className="resize-none rounded-lg border border-zinc-300 px-3 py-2 outline-none text-black"
              autoFocus
            />
          </div>

          <div className="flex justify-between gap-2">
            <button
              onClick={handleBackStep}
              className="rounded-lg border border-zinc-300 px-4 py-2"
            >
              Voltar
            </button>

            <div className="flex gap-2">
              <button
                onClick={handleCloseModal}
                className="rounded-lg border border-zinc-300 px-4 py-2"
              >
                Cancelar
              </button>

              <button
                onClick={handleCreatePost}
                disabled={!content.trim()}
                className="rounded-lg bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </main>
  );
}
