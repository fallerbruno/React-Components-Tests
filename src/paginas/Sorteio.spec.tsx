import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Sorteio from "./Sorteio";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import { useResultadoSorteio } from "../state/hook/useResultadoSorteio";

jest.mock("../state/hook/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

jest.mock("../state/hook/useResultadoSorteio", () => {
  return {
    useResultadoSorteio: jest.fn(),
  };
});

describe("na pagina de sorteio", () => {
  const partcipantes = ["Ana", "João", "Rafa"];

  const resultado = new Map([
    ["Ana", "João"],
    ["João", "Rafa"],
    ["Rafa", "Ana"],
  ]);

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(partcipantes);
    (useResultadoSorteio as jest.Mock).mockReturnValue(resultado);
  });

  test("todos os participantes podem exibir o seu amigo secreto", () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const opcoes = screen.getAllByRole("option");

    expect(opcoes).toHaveLength(partcipantes.length + 1);
  });
  test("o amigo secreto deve ser exibido quando solicitado", async () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const select = screen.getByPlaceholderText(/selecione/i);

    fireEvent.change(select, { target: { value: partcipantes[0] } });

    const botao = screen.getByRole("button");

    fireEvent.click(botao);

    const amigoSecreto = await screen.findByRole("alert");

    expect(amigoSecreto).toBeInTheDocument();
  });
});
