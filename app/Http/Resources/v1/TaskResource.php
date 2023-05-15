<?php

namespace App\Http\Resources\v1;
use App\Models\User;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return 
        [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'date_ending' => $this->date_ending,
            'priority' => $this->priority,
            'status' => $this->status,
            'creator_id' => $this->creator_id,
            'responsible_id' => $this->responsible_id,
            'created_id' => $this->created_id,
            'updated_id' => $this->updated_id

        ];
    }
}
