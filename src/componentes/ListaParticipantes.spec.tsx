import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import ListaParticipantes from "./ListaParticipantes";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";

// faz o mock do hook useListaDeParticipantes
jest.mock("../state/hook/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

describe("Lista de participantes", () => {
  //seta o mock em cada teste
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([]);
  });
  it("lista vazia", () => {
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    );

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
  describe("lista preenchida de participantes", () => {
    const participantes = ["Ana", "Bia", "Carlos"];

    beforeEach(() => {

      (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
    });
    it("renderizar elementos", () => {
      render(
        <RecoilRoot>
          <ListaParticipantes />
        </RecoilRoot>
      );

      expect(screen.queryAllByRole("listitem")).toHaveLength(participantes.length);
    });
  });
});
