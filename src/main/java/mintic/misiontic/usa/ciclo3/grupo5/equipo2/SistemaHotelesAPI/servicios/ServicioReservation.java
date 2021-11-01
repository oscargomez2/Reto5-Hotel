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
/**
 * 
 * @author Equipo 2
 */
@Service
public class ServicioReservation {
    /**
     * Atributo de la clase RepositorioReservation
     */
    @Autowired
    private RepositorioReservation metodosCrud;
    /**
     * Metodo para obtener todas las reservaciones
     * @return una lista con todas las reservaciones
     */
    public List<Reservation> getAll() {
        return metodosCrud.getAll();
    }
    /**
     * Metodo para obtener una reservacion
     * @param idReservation
     * @return una reservacion
     */
    public Optional<Reservation> getReservation(int idReservation) {
        return metodosCrud.getReservation(idReservation);
    }
    /**
     * Metodo para guardar una reservacion
     * @param categoria 
     */
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
    /**
     * Metodo para actualizar una reservacion
     * @param reservation 
     */
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
    /**
     * Metodo para eliminar una reservacion
     * @param idReservation
     * @return un booleano
     */
    public boolean delete(int idReservation) {
        Optional<Reservation> obtener = metodosCrud.getReservation(idReservation);
        if (!obtener.isEmpty()) {
            metodosCrud.delete(obtener.get());
            return true;
        }
        return false;
    }
    /**
     * Metodo para obtener la cantidad de reservas completadas y canceladas
     * @return un objeto de la clase StatusReservas
     */
    public StatusReservas reporteStatusServicio() {
        List<Reservation> completed = metodosCrud.ReservacionStatusRepositorio("completed");
        List<Reservation> cancelled = metodosCrud.ReservacionStatusRepositorio("cancelled");
        return new StatusReservas(completed.size(), cancelled.size());
    }
    /**
     * Metodo para obtener las reservaciones entre un periodo de fechas
     * @param start
     * @param end
     * @return una lista de reservaciones
     */
    public List<Reservation> reporteFecha(String start, String end) {
        return metodosCrud.reporteFecha(start, end);
    }
    /**
     * Metodo para obtener los clientes que mas dinero dejaron
     * @return una lista
     */
    public List<ReporteClientes> reporteClientes() {
        List<ReporteClientes> returnValue = new ArrayList<>();
        for (Object reporteEstado : metodosCrud.reporteClientes()) {
            Object[] dato = (Object[]) reporteEstado;
            returnValue.add(new ReporteClientes(Integer.valueOf(dato[0].toString()), (Client) dato[1]));
        }
        return returnValue;
    }
}
