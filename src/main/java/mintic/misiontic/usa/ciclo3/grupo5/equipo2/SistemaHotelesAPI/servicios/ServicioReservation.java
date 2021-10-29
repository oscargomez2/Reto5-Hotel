package mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.servicios;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.Reportes.StatusReservas;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.modelos.Client;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.modelos.Reportes.ReporteClientes;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.modelos.Reservation;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.repositorios.RepositorioReservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServicioReservation {

    @Autowired
    private RepositorioReservation metodosCrud;

    public List<Reservation> getAll() {
        return metodosCrud.getAll();
    }

    public Optional<Reservation> getReservation(int id) {
        return metodosCrud.getReservation(id);
    }

    public void save(Reservation categoria) {
        if (categoria.getIdReservation() == null) {
            metodosCrud.save(categoria);
        } else {
            Optional<Reservation> evt = metodosCrud.getReservation(categoria.getIdReservation());
            if (evt.isEmpty()) {
                metodosCrud.save(categoria);
            }
        }
    }

    public void update(Reservation reservation) {
        if (reservation.getIdReservation() != null) {
            Optional<Reservation> obtener = metodosCrud.getReservation(reservation.getIdReservation());
            if (!obtener.isEmpty()) {
                if (reservation.getStartDate() != null) {
                    obtener.get().setStartDate(reservation.getStartDate());
                }
                if (reservation.getDevolutionDate() != null) {
                    obtener.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                metodosCrud.save(obtener.get());
            }
        }
    }

    public boolean delete(int id) {
        Optional<Reservation> obtener = metodosCrud.getReservation(id);
        if (!obtener.isEmpty()) {
            metodosCrud.delete(obtener.get());
            return true;
        }
        return false;
    }

    public StatusReservas reporteStatusServicio() {
        List<Reservation> completed = metodosCrud.ReservacionStatusRepositorio("completed");
        List<Reservation> cancelled = metodosCrud.ReservacionStatusRepositorio("cancelled");
        return new StatusReservas(completed.size(), cancelled.size());
    }
    
    public List<Reservation> reporteFecha(String start, String end) {
        return metodosCrud.reporteFecha(start, end);
    }
    
    public List<ReporteClientes> reporteClientes() {
        List<ReporteClientes> returnValue = new ArrayList<>();
        for (Object reporteEstado : metodosCrud.reporteClientes()) {
            Object[] dato = (Object[]) reporteEstado;
            returnValue.add(new ReporteClientes(Integer.valueOf(dato[0].toString()), (Client) dato[1]));
        }
        return returnValue;
    }
}
