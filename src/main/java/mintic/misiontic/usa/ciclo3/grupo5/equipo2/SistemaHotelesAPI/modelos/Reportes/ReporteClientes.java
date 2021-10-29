package mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.modelos.Reportes;

import java.io.Serializable;
import lombok.Data;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.modelos.Client;

@Data
public class ReporteClientes implements Serializable {

    Integer total;
    Client client;

    public ReporteClientes(Integer total, Client client) {
        this.total = total;
        this.client = client;
    }
}
