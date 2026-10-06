package com.maker.website.machines.dtos;

import com.maker.website.machines.enums.MachineStatusENUM;

public record UpdateMachineDTO(
        String name,
        String description,

        MachineStatusENUM status
) {

}
