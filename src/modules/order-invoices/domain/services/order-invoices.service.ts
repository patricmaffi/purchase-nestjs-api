import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { createWriteStream, readFileSync, writeFileSync } from 'fs';
import { gerarDanfe } from 'webdanfe';
import { get } from 'http';
import {
  BLING_API_KEY,
  API_CONFIG_JSON,
} from '../../../../shared/helpers/constants';
import { OrderInvoicesRepository } from '../repository/order-invoices.repository';

@Injectable()
export class OrderInvoicesService {
  constructor(
    private httpService: HttpService,
    private readonly invoiceRepository: OrderInvoicesRepository,
  ) {}

  public async listInvoices(tipo, situacao): Promise<any> {
    const ini = new Date();
    const fim = new Date();

    ini.setDate(fim.getDate() - 15);

    const format = (d) => {
      let newDate = d.toISOString();
      newDate = newDate.replace(/\D/g, '');
      newDate = newDate.replace(
        /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
        '$3/$2/$1 $4:$5:$6',
      );
      newDate = newDate.substring(0, 10);
      return newDate;
    };

    const iniS = format(ini) + ' 00:00:01';
    const fimS = format(fim) + ' 23:59:59';

    let filters = '';
    if (tipo || situacao) {
      filters = `filters=`;
      filters += tipo ? `tipo[${tipo}];` : '';
      filters += situacao ? `situacao[${situacao}]` : '';
    }
    filters = `filters=tipo[${tipo}];situacao[${situacao}];dataEmissao[${iniS} TO ${fimS}]`;
    // filters = `filters=tipo[${tipo}];situacao[${situacao}];dataEmissao[30/05/2021 00:01:00 TO 31/05/2021 23:59:59]`

    try {
      const url = `https://bling.com.br/Api/v2/notasfiscais/json/?apikey=${BLING_API_KEY}&${filters}`;

      const response = await lastValueFrom(
        this.httpService.get(url, API_CONFIG_JSON),
      );

      if (response.data.retorno.erros) {
        return response.data.retorno.erros[0].erro;
      }

      // let notasFiltradas = response.data.retorno.notasfiscais.filter((nota) => {
      //     switch (tipoFiltro) {
      //         default:
      //             return response.data.retorno.notasfiscais
      //         case tipoFiltro == "chave":
      //             return nota.notafiscal.chaveAcesso
      //         case tipoFiltro == "num":
      //             return nota.notafiscal.numero
      //         case tipoFiltro == "data":
      //             return nota.notafiscal.dataEmissao
      //     }
      // })

      // return notasFiltradas;
      //return response.data.retorno.notasfiscais;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  public async getXmlInvoiceByNumber(params) {
    // Verificar o retorno e criar nova implementação para essa função após conseguir os parametros necessários.
    /*
    try {
      const nota = await this.getNotaByNumero(params);
      if (nota.erro) {
        return null;
      }
      const url = nota[0].notafiscal.xml;
      const response = await axios.get(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      // console.log(response.data)

      let json = toJson(response.data);
      json = JSON.parse(json);
      console.log(json.nfeProc.NFe.infNFe);
      console.log(json.nfeProc.NFe.infNFe.det);
      nota[0].det = json.nfeProc.NFe.infNFe.det;
      return nota;
    } catch (error) {
      console.error(error);
      return error;
    }
    */
  }

  public async getInvoiceByNumberParams(serie, numero) {
    const params = {
      params: {
        serie: serie,
        numero: numero,
      },
    };

    return await this.getInvoiceByNumber(params);
  }

  public async getInvoiceByNumber(params) {
    const { serie } = params.params;
    const { numero } = params.params;

    try {
      const url = `https://bling.com.br/Api/v2/notafiscal/${numero}/${serie}/json/?apikey=${BLING_API_KEY}`;

      const response = await lastValueFrom(this.httpService.get(url));

      if (response.data.retorno.erros) {
        return response.data.retorno.erros[0];
      }

      return response.data.retorno.notasfiscais;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  public async generateDanfe(params) {
    try {
      // let url = `https://bling.com.br/Api/v2/notasfiscais/json/?apikey=3b24c69a6e74f2b73d9625e0ee87bb72812737d1a9ad8a1a920f65c7a76e764fda46325f&${filters}`
      const file = createWriteStream('nota.xml');

      get(
        'https://bling.com.br/relatorios/nfe.xml.php?s&chaveAcesso=41210502551354000150550010000064961243592102',
        (response) => {
          response.pipe(file);
        },
      );

      const xml = readFileSync(
        'https://bling.com.br/relatorios/nfe.xml.php?s&chaveAcesso=41210502551354000150550010000064961243592102',
      ).toString();

      gerarDanfe(xml, function (err, pdf) {
        if (err) {
          throw err;
        }

        writeFileSync('danfe.pdf', pdf, {
          encoding: 'binary',
        });
      });
      return xml;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  public async storeNota(nota) {
    const data = nota;

    console.log(data);

    try {
      // Verificar findcreate não existe (???)
      /*
      const nota = this.orderInvoiceRepository.findcreate({
        serie: data.serie,
        numero: data.numero,
      });
      */

      // console.log(data);

      // let notas = await this.notasRepo
      //   .createQueryBuilder('OrderInvoices')
      //   .innerJoinAndSelect('OrderInvoices.purchaseOrder', 'purchaseOrder')
      //   .insert()
      //   .into(OrderInvoices, ['serial', 'number', 'purchaseOrder', 'key'])
      //   .values([
      //     {
      //       serial: data.serie,
      //       number: data.numnota,
      //       purchaseOrder: data.numpedido,
      //       key: data.chave,
      //     },
      //   ])
      //   .returning(['id'])
      //   .execute();

      return nota;
    } catch (error) {
      console.log(error);
    }
  }
}
