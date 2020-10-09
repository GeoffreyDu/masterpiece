package fr.formation.masterpieceback.dtos;


import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

public class EventDtoUpdate {

    @NotBlank
    @Size(min = 3, max = 255)
    private String title;

    @NotNull
    @FutureOrPresent
    private LocalDateTime dateTime;

    @NotBlank
    @Size(min = 3, max = 255)
    private String description;

    
    public EventDtoUpdate() {
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
