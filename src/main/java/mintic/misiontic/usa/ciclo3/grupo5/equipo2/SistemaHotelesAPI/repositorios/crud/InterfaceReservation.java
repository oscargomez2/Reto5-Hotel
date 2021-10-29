package mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.repositorios.crud;

import java.util.Date;
import java.util.List;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.modelos.Reservation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface InterfaceReservation extends CrudRepository<Reservation, Integer> {

    public List<Reservation> findAllByStatus(String status);
    
    List<Reservation> findAllByStartDateBetween(Date fechaInicio, Date fechaFin);
    
    @Query("select count(*) as total, r.client from Reservation as r group by r.client order by count(*) desc")
    Object[] reportClients();
}
