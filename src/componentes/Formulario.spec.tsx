import { render, screen } from "@testing-library/react";
import React from "react";
import { fireEvent } from "@testing-library/react";
import App from "../App";
import { act } from "react-dom/test-utils";

describe("Formulario", () => {
  it("quando o input está vazio, novos participantes não são adicionados", () => {
    // renderizar o componente
    render(<App />);

    // encontra no DOM o input
    const input = screen.getByPlaceholderText(
      /Insira os nomes dos participantes/i
    );

    // encontra no DOM o botão
    const button = screen.getByRole("button", { name: /adicionar/i });

    // garante que o input esta no DOM
    expect(input).toBeInTheDocument();
    // garante que o botão esta no DOM
    expect(button).toBeInTheDocument();
    // garante que o botão esta desabilitado
    expect(button).toBeDisabled();
  });

  it("adicionar um participante caso exista um nome preenchido", () => {
    // renderizar o componente
    render(<App />);
    // encontra no DOM o input
    const input = screen.getByPlaceholderText(
      /Insira os nomes dos participantes/i
    );

    // encontra no DOM o botão
    const button = screen.getByRole("button", { name: /adicionar/i });

    // insere um valor no input
    fireEvent.change(input, { target: { value: "João Pedro" } });

    // clicar no botão de submeter
    fireEvent.click(button);

    //garantir q o input esteja com o foco ativo
    expect(input).toHaveFocus();

    //garantir q o input esteja vazio
    expect(input).toHaveValue("");
  });

  it("Nomes duplicados não podem ser adicionados", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(
      /Insira os nomes dos participantes/i
    );

    const button = screen.getByRole("button", { name: /adicionar/i });

    fireEvent.change(input, { target: { value: "João Pedro" } });
    fireEvent.click(button);

    fireEvent.change(input, { target: { value: "João Pedro" } });
    fireEvent.click(button);

    const mensagemDeErro = screen.getByRole("alert");

    expect(mensagemDeErro.textContent).toBe(
      "Nomes duplicados não são permitidos!"
    );
  });

  it("mensagem de erro deve subir apos os timers", () => {
    jest.useFakeTimers();
    render(<App />);
    const input = screen.getByPlaceholderText(
      /Insira os nomes dos participantes/i
    );

    const button = screen.getByRole("button", { name: /adicionar/i });

    fireEvent.change(input, { target: { value: "João Pedro" } });
    fireEvent.click(button);

    fireEvent.change(input, { target: { value: "João Pedro" } });
    fireEvent.click(button);

    let mensagemDeErro = screen.getByRole("alert");

    expect(mensagemDeErro).toBeInTheDocument();

    act(() => {
      // esperar n segundos
      jest.runAllTimers();
    });

    expect( screen.queryByRole("alert")).toBeNull();
  });
});
