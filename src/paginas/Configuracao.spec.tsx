import { RecoilRoot } from "recoil";
import Configuracao from "./Configuracao";
import { render } from "@testing-library/react";

const mockNavegação = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    useNavigate: () => mockNavegação,
  };
});

describe("a pagina de configuração", () => {
  it("deve ser renderizada corretamente", () => {
    const { container } = render(
      <RecoilRoot>
        <Configuracao />
      </RecoilRoot>
    );

    expect(container).toMatchSnapshot();
  });
});
