import { FC} from 'react';
import './receipt.scss'
import Button from "../../components/common/button/Button";

const Receipt: FC = () => {
    return (
        <div className={'receipt'}>
          <div className="receipt-body">
            <div className="receipt-body-title">
              <h1>Titulo do anuncio</h1>
              <p className="description">Descrição do anuncio</p>
            </div>
            <div className="receipt-body-info">
                <div className="labels">
                  <label>Data:</label>
                  <label>Moeda:</label>
                  <label>Moeda de troca:</label> 
                  <label>Metodo de pagamento:</label>
                  <label>Valor:</label>
                </div>
                <div className="values">
                  <p>05 de junho de 2022</p>
                  <p>Japao 1</p>
                  <p>Japao 2</p>
                  <p>Cartao de credito</p>
                  <p>R$100,00</p>
                </div>
              </div>
          </div>
          <div className="receipt-footer">
            <Button text={'Imprimir'}/>
          </div>
        </div>
    );
};

export default Receipt;
