package co.masterclass.ciclo3.ciclo3.service;

import co.masterclass.ciclo3.ciclo3.model.Message;
import co.masterclass.ciclo3.ciclo3.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAll(){
        return messageRepository.getAll();
    }

    public Optional<Message> getMessage(int id){
        return messageRepository.getMessage(id);
    }

    public Message save(Message m){
        if(m.getIdMessage()==null){
            return messageRepository.save(m);
        }else{
            Optional<Message> maux = messageRepository.getMessage(m.getIdMessage());
            if(maux.isEmpty()){
                return messageRepository.save(m);
            }else{
                return m;
            }
        }
    }

    public Message update(Message m){
        if(m.getIdMessage() != null){
            Optional<Message> maux = messageRepository.getMessage(m.getIdMessage());
            if(!maux.isEmpty()){
                if(m.getMessageText() != null){
                    maux.get().setMessageText(m.getMessageText());
                }
                if(m.getClient() != null){
                    maux.get().setClient(m.getClient());
                }
                if(m.getQuadbike() != null){
                    maux.get().setQuadbike(m.getQuadbike());
                }
                messageRepository.save(maux.get());
                return maux.get();
            }else{
                return m;
            }
        }else {
            return m;
        }
    }

    public boolean delete(int id){
        Boolean mBoolean = getMessage(id).map(message -> {
            messageRepository.delete(message);
            return true;
        }).orElse(false);
        return mBoolean;
    }
}
