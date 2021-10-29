package mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.modelos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "client")
public class Client implements Serializable {

    public Client() {
        messages = new ArrayList<>();
        reservations = new ArrayList<>();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    Integer idClient;
    String email;
    String password;
    String name;
    Integer age;

    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "client")
    List<Message> messages;

    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "client")
    @JsonIgnoreProperties("client")
    List<Reservation> reservations;

}
