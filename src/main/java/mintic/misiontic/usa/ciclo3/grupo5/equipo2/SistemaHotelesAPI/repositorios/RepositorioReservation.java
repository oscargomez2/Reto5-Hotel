package mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.repositorios;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.modelos.Reservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.repositorios.crud.InterfaceReservation;

@Repository
public class RepositorioReservation {

    @Autowired
    private InterfaceReservation crud;

    public List<Reservation> getAll() {
        return (List<Reservation>) crud.findAll();
    }

    public Optional<Reservation> getReservation(int id) {
        return crud.findById(id);
    }

    public Reservation save(Reservation categoria) {
        return crud.save(categoria);
    }

    public void delete(Reservation message) {
        crud.delete(message);
    }

    public List<Reservation> ReservacionStatusRepositorio(String status) {
        return crud.findAllByStatus(status);
    }
    
    public List<Reservation> reporteFecha(String start, String end) {
        try {
            return crud.findAllByStartDateBetween(new SimpleDateFormat("yyyy-MM-dd").parse(start), new SimpleDateFormat("yyyy-MM-dd").parse(end));
        } catch (ParseException ex) {
            return null;
        }
    }
    
    public Object[] reporteClientes() {
        return crud.reportClients();
    }
}
