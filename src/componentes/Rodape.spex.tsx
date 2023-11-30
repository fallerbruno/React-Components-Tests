import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Rodape from "./Rodape";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";

jest.mock("../state/hook/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

jest.mock("../state/hook/useSorteador", () => {
  return {
    useSorteador: jest.fn(),
  };
});

const mockNavegação = jest.fn();
const mockSorteio = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    useNavigate: () => mockNavegação,
  };
});

describe("onde não existem participantes suficientes", () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([]);
  });
  it("a brincadeira não pode ser inciada", () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole("button", { name: /iniciar/i });

    expect(botao).toBeDisabled();
  });
});

describe("onde existem participantes suficientes", () => {
  const participantes = ["Ana", "Bia", "Carlos"];

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
  });
  it("a brincadeira pode ser inciada", () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole("button", { name: /iniciar/i });

    expect(botao).not.toBeDisabled();
  });

  it("ao clicar no botão, a brincadeira é iniciada", () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole("button", { name: /iniciar/i });
    fireEvent.click(botao);

    expect(mockNavegação).toHaveBeenCalledWith("/sorteio");
    expect(mockSorteio).toHaveBeenCalledTimes(1);
  });
});
