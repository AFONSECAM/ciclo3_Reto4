package co.masterclass.ciclo3.ciclo3.service;

import java.util.List;
import java.util.Optional;
import co.masterclass.ciclo3.ciclo3.model.Quadbike;
import co.masterclass.ciclo3.ciclo3.repository.QuadbikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuadbikeService {
    @Autowired
    private QuadbikeRepository quadbikeRepository;

    public List<Quadbike> getAll(){
        return quadbikeRepository.getAll();
    }

    public Optional<Quadbike> getQuadbike(Integer id){
        return quadbikeRepository.getQuadbike(id);
    }

    public Quadbike save(Quadbike q){
        if(q.getId()==null){
            return quadbikeRepository.save(q);
        }else{
            Optional<Quadbike> qaux = quadbikeRepository.getQuadbike(q.getId());
            if(qaux.isEmpty()){
                return quadbikeRepository.save(q);
            }else{
                return q;
            }
        }
    }

    public Quadbike update(Quadbike q){
        if(q.getId() != null){
            Optional<Quadbike> qaux = quadbikeRepository.getQuadbike(q.getId());
            if(!qaux.isEmpty()){
                if(q.getName() != null){
                    qaux.get().setName(q.getName());
                }
                if(q.getBrand() != null){
                    qaux.get().setBrand(q.getBrand());
                }
                if(q.getYear() != null){
                    qaux.get().setYear(q.getYear());
                }
                if(q.getDescription() != null){
                    qaux.get().setDescription(q.getDescription());
                }
                if(q.getCategory() != null){
                    qaux.get().setCategory(q.getCategory());
                }
                if(q.getMessages() != null){
                    qaux.get().setMessages(q.getMessages());
                }
                if(q.getReservations() != null){
                    qaux.get().setReservations(q.getReservations());
                }
                quadbikeRepository.save(qaux.get());
                return qaux.get();
            }else{
                return q;
            }
        }else{
            return q;
        }
    }

    public boolean delete(int id){
        Boolean qBoolean = getQuadbike(id).map(quadbike -> {
            quadbikeRepository.delete(quadbike);
            return true;
        }).orElse(false);
        return qBoolean;
    }
}
