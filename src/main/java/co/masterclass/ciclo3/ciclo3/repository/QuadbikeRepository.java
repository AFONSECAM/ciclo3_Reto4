package co.masterclass.ciclo3.ciclo3.repository;

import co.masterclass.ciclo3.ciclo3.model.Quadbike;
import co.masterclass.ciclo3.ciclo3.repository.crud.QuadbikeCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public class QuadbikeRepository {

    @Autowired
    private QuadbikeCrudRepository quadbikeCrudRepository;

    public List<Quadbike> getAll(){
        return (List<Quadbike>) quadbikeCrudRepository.findAll();
    }

    public Optional<Quadbike> getQuadbike(Integer id){
        return quadbikeCrudRepository.findById(id);
    }

    public Quadbike save(Quadbike q){
        return quadbikeCrudRepository.save(q);
    }

    public void delete(Quadbike q){ quadbikeCrudRepository.delete(q); }
}
