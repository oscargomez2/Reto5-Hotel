package mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.servicios;

import java.util.List;
import java.util.Optional;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.modelos.Room;
import mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.repositorios.RepositorioRoom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServicioRoom {

    @Autowired
    private RepositorioRoom metodosCrud;

    public List<Room> getAll() {
        return metodosCrud.getAll();
    }

    public Optional<Room> getRoom(int id) {
        return metodosCrud.getRoom(id);
    }

    public void save(Room categoria) {
        if (categoria.getId() == null) {
            metodosCrud.save(categoria);
        } else {
            Optional<Room> evt = metodosCrud.getRoom(categoria.getId());
            if (evt.isEmpty()) {
                metodosCrud.save(categoria);
            }
        }
    }

    public void update(Room room) {
        if (room.getId() != null) {
            Optional<Room> obtener = metodosCrud.getRoom(room.getId());
            if (!obtener.isEmpty()) {
                if (room.getName() != null) {
                    obtener.get().setName(room.getName());
                }
                if (room.getHotel() != null) {
                    obtener.get().setHotel(room.getHotel());
                }
                if (room.getStars() != null) {
                    obtener.get().setStars(room.getStars());
                }
                if (room.getDescription() != null) {
                    obtener.get().setDescription(room.getDescription());
                }
                metodosCrud.save(obtener.get());
            }
        }
    }

    public boolean delete(int id) {
        Optional<Room> obtener = metodosCrud.getRoom(id);
        if (!obtener.isEmpty()) {
            metodosCrud.delete(obtener.get());
            return true;
        }
        return false;
    }
}
