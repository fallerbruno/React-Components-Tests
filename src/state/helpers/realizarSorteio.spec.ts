import { realizarSorteio } from "./realizarSorteio";

describe("dado um sorteio de amigo secreto", () => {
  test("cada participante nao sorteia ele mesmo", () => {
    const participantes = ["A", "B", "C", "D", "E"];

    const sorteio = realizarSorteio(participantes);

    participantes.forEach((participante) => {
      const amigoSecreto = sorteio.get(participante);
      
      expect(amigoSecreto).not.toBe(participante);
    });
  });
});
