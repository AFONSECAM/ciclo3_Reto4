package co.masterclass.ciclo3.ciclo3.web;

import co.masterclass.ciclo3.ciclo3.model.Quadbike;
import co.masterclass.ciclo3.ciclo3.service.QuadbikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Quadbike")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class QuadbikeController {
    @Autowired
    private QuadbikeService quadbikeService;

    @GetMapping("/all")
    public List<Quadbike> getQuadbikes(){
        return quadbikeService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Quadbike> getQuadbike(@PathVariable("id") int id){
        return quadbikeService.getQuadbike(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Quadbike save(@RequestBody Quadbike q){
        return quadbikeService.save(q);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Quadbike update(@RequestBody Quadbike q){return quadbikeService.update(q);}

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id){ return quadbikeService.delete(id); }

}
