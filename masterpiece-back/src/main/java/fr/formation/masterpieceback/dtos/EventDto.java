package fr.formation.masterpieceback.dtos;

import fr.formation.masterpieceback.constraints.UniqueEvent;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
//DTO with validations constraints
@UniqueEvent
public class EventDto {

    @NotBlank
    @Size(min = 3, max = 18)
    private String title;

    @NotNull
    @FutureOrPresent
    private LocalDateTime dateTime;

    @NotBlank
    @Size(min = 3, max = 30)
    private String description;


    public EventDto() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
