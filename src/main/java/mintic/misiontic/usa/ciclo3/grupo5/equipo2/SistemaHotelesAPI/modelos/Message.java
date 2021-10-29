



package mintic.misiontic.usa.ciclo3.grupo5.equipo2.SistemaHotelesAPI.modelos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "message")
public class Message implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idMessage;

    String messageText;
    
    @ManyToOne
    @JoinColumn(name = "roomID")
    @JsonIgnoreProperties({"reservations","messages"})
    Room room;
    
    @ManyToOne
    @JoinColumn(name = "clientID")
    @JsonIgnoreProperties({"reservations","messages"})
    Client client;
    
    
}
