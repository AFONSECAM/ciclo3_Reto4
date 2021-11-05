package co.masterclass.ciclo3.ciclo3.service;

import co.masterclass.ciclo3.ciclo3.model.Client;
import co.masterclass.ciclo3.ciclo3.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAll(){
        return clientRepository.getAll();
    }

    public Optional<Client> getClient(int id){
        return clientRepository.getClient(id);
    }

    public Client save(Client c){
        if(c.getIdClient()==null){
            return clientRepository.save(c);
        }else{
            Optional<Client> caux = clientRepository.getClient(c.getIdClient());
            if(caux.isEmpty()){
                return clientRepository.save(c);
            }else{
                return c;
            }
        }
    }

    public Client update(Client c){
        if(c.getIdClient() != null){
            Optional<Client> caux = clientRepository.getClient(c.getIdClient());
            if(!caux.isEmpty()){
                if(c.getEmail() != null){
                    caux.get().setEmail(c.getEmail());
                }
                if(c.getPassword() != null){
                    caux.get().setPassword(c.getPassword());
                }
                if(c.getName() != null){
                    caux.get().setName(c.getName());
                }
                if(c.getAge() != null){
                    caux.get().setAge(c.getAge());
                }
                if(c.getMessages() != null){
                    caux.get().setMessages(c.getMessages());
                }
                if(c.getReservations() != null){
                    caux.get().setReservations(c.getReservations());
                }
                clientRepository.save(caux.get());
                return caux.get();
            }else{
                return c;
            }
        }else{
            return c;
        }
    }

    public boolean delete(int id){
        Boolean cBoolean = getClient(id).map(client -> {
            clientRepository.delete(client);
            return true;
        }).orElse(false);
        return cBoolean;
    }
}
